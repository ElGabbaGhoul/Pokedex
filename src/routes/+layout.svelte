<script lang="ts">
  import { page } from "$app/stores";
  import { caughtMons } from "$lib/stores";
</script>

<div class="navbar">
  <a href="/" class:active={$page.url.pathname == "/"}>Home</a>
  <a href="/my-mons" class:active={$page.url.pathname == "/my-mons"}
    >My Pokémon ({$caughtMons.length})
  </a>
</div>

<div class="container">
  <slot />
</div>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    background-color: #333;
    padding: 10px;
  }

  .navbar a {
    color: #fff;
    text-decoration: none;
  }

  :global(body) {
    margin: 0;
  }

  .navbar a:hover {
    color: #ccc;
  }

  .navbar a.active {
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .container {
    max-width: 90%;
    margin: 0 auto;
    width: 1200px;
  }
</style>
