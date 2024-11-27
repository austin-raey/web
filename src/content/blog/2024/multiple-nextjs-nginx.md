---
title: Multiple NextJS instances with NGINX
shortDescription: Getting two NextJS instances to play nice together on the same server
date: 2024-11-23
icons: ["ph/list-numbers-duotone", "ph/gear-fine-duotone"]
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

</section>

<section>

## The Problem

When running multiple NextJS instances on the same server, your biggest problem is the `/_next` folder. Without configuration, artifacts from **both instances** are served from this directory. This means requests made to any particular path, e.g. `/profile`, will have Next artifacts served from `/_next`.

So, even if you correctly proxy requests to the correct NextJS instance per path, the browser will still load the wrong assets.

</section>

<section>

## Solution

TBW

</section>
