<script lang="ts">
  import { caughtMons } from "$lib/stores";
  import Monster from "../Monster.svelte";
</script>

<h2>My Pokémon</h2>

<div class="monsters">
  {#each $caughtMons as mon}
    <Monster {mon} />
  {/each}
</div>

<style>
  .monsters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
