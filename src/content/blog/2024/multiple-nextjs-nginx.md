---
title: Multiple NEXT.JS instances with NGINX
description: Getting two NEXT.JS instances to play nice together on the same server
date: 2024-11-23
kind: ["tutorial", "framework"]
---

<div class="tags">
	Relevant technologies:
	<ul>
		<li><a href="https://nginx.org/" rel="external noopener noreferrer" target="_blank">NGINX</a></li>
		<li><a href="https://nextjs.org/" rel="external noopener noreferrer" target="_blank">NEXT.JS</a></li>
		<li><a href="https://www.docker.com/" rel="external noopener noreferrer" target="_blank">Docker</a></li>
  </ul>
</div>

<section>

## Background

Recently at work, it has come up that we want to incrementally update _specific_ paths in our app with the latest version of NEXT.JS (15). The old app is also based on an older version of NEXT.JS (11), but would require non-trivial changes to upgrade &mdash; so we are opting to rebuild the app from scratch.

Prior to this, other upgrades or rewrites had allowed us to directly host the app on a new subdomain and server, because they were small enough to do it all at once. This time, however, we do not have this luxury.

Both apps are hosted / run / deployed on the same server.

</section>

<section>

## The Problem

When running multiple NEXT.JS instances on the same server, your biggest problem is the `/_next` folder. Without configuration, artifacts from **both instances** are served from this directory. This means requests made to any particular path, e.g. `/profile`, will have Next artifacts served from `/_next`.

So, even if you correctly proxy requests to the correct NEXT.JS instance per path, the browser will still load the wrong assets. Depending on the instance hit, with no configuration, it will attempt to request `_next` and get assets on whatever instance is the default for the server.

In some suggestions I've found online, they often might refer to changing the `basePath` in the `next.config.js` file &mdash; but this is _not_ feasible for our situation. Both instances theoretically could have the same paths in the future (_the new app is simply a remake of the old one!_), and the new app needs to be able to replace those incrementally. For instance, the new app might have a `/profile` path, and the old app might have a `/profile` path. However, with `basePath` configured on the new app, we'd have something weird to deal with like how we are supposed to route to `/${basePath}/profile` for the new app, but make it look like `/profile` to the end user browser. I'm sure it's possible with some NGINX configuration or NEXT.JS `middleware.ts` config, but `assetPrefix` was much simpler for us.

</section>

<section>

## Solution

In a nutshell, the idea to solve this is to have NEXT serve its artifacts from a different directory for each instance. This way, the browser will load the correct assets for each path.

In our case, we use NGINX to proxy requests to the correct instance based on the path.

Thankfully, NEXT.JS has a configuration option to change the directory where it serves its build artifacts from &mdash; `assetPrefix`. This in tandem with NGINX allows us to serve the correct assets for each instance per path with no strange configuration rot. I'm sure this could also apply to other reverse proxies, but I have not tried it because NGINX is what we use.

<small>**Note**: NEXT.JS doesn't seem to note in its documentation when the `assetPrefix` configuration was first added. From a quick Google search, the earliest I could find was [from at least **version 9.5.2**](https://stackoverflow.com/questions/63347780/nextjs-assetprefix-and-basepath-prefix-not-taking-effect).</small>

Here's a rough outline of the steps to get this working:

1. On at least one of your NEXT.JS instances, configure `assetPrefix` to be unique, e.g. `v2` for the new app.

   ```typescript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
   	assetPrefix: "/v2"
   };
   ```

   For something repeatable, you could simply assign a unique identifier to each instance, e.g. `v1`, `v2`, etc, as a rule so every app is consistent.

2. **Optional**: Although it is possible this might not matter for your apps, I had noticed for our two apps, we used an `app/api` / `pages/api` directory for our API routes. This causes the same problem as the `/_next` directory.

   To solve this, if possible, you can simply change this `./api` directory to match your asset prefix, e.g. `./v2/api`. This will simplify your NGINX configuration.

   Likewise, you may have to do this for `/public` folder assets.

3. Configure NGINX to proxy requests to the correct instance based on the path.

   ```nginx
   server {
   	listen 80;
   	server_name example.com;

   	# The old app will the default for arbitrary paths.
   	location / {
   		proxy_pass http://localhost:3000;
   	}

   	# The new app assets will be served from /v2, as configured in `next.config.js`.
   	# Because we changed the API routes to match `assetPrefix` (v2/api),
   	# this configuration item also applies to them.
   	location /v2 {
   		proxy_pass http://localhost:3001;
   	}

   	# Optionally, if you chose to give an `assetPrefix` to all apps, also configure them.
   	location /v1 {
   		proxy_pass http://localhost:3000;
   	}

   	# Incrementally pass routes to the new NEXT.JS app as they are created.
   	location /profile {
   		proxy_pass http://localhost:3001;
   	}
   }
   ```

That's basically it! With this configuration, you should be able to run multiple NEXT.JS instances on the same server and have them play nice together.

For our case, this is thankfully enough &mdash; the stickiest situation we could have in future is a catch-all route we have on the root `/{catch-all}`. Once this catch-all view is reimplemented, I believe it will make sense to switch the `location /` configuration to point at the new app, then point other `location /{path}` configurations to the old app.

Something to keep in mind is structuring your routes in such a way that there is little potential for overlap. For example, having a `/profile` client component query some random `/otherpath/api-route` path could potentially cause collisions between the old and new app, especially if you are re-implementing the API routes as well. It may be best to ensure everything stays organized &ndash; e.g. in your `v2/api` folder &ndash; or you may end up with a messy / confusing NGINX configuration.

However &mdash; and I'm just thinking out loud &mdash; you may intend for the _new app_ to query server routes in the _old app_ for some reason, but you would need to ensure that old API route is robust. That certainly could be an intersting use case.

For more literature on this topic, I originally found the idea of using `assetPrefix` hidden within NEXT.JS's documentation on ["Multi-Zones"](https://nextjs.org/docs/app/building-your-application/deploying/multi-zones). This also includes some more info on writing middleware / rewrites for your app, which could be useful for more complex configurations. In our case, simply configuring `assetPrefix` with a simple NGINX configuration was enough.

</section>
