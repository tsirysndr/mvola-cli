---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **MVola CLI in less than 5 minutes**.

![image info](https://raw.githubusercontent.com/tsirysndr/mvola-cli/master/preview.png)

## Getting Started

Get started by **creating a new app** in [MVola Dev Portal](https://www.mvola.mg/devportal/applications).

Export the consumer key and consumer secret as environment variables:

```bash
export CONSUMER_KEY=<your consumer key>
export CONSUMER_SECRET=<your consumer secret>
```

### What you'll need

- [Deno](https://deno.land/) version 1.22 or above:

## Installation


```bash
deno install --allow-env --allow-net -n mvola https://deno.land/x/mvola_cli@0.1.4/src/main.ts
```

Note: don't forget to add `$HOME/.deno/bin` to your `$PATH`.

