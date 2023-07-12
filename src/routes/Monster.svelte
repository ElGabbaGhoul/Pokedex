<script lang="ts">
  import type { IndexMonster } from "./+page";
  import { caughtMons } from "$lib/stores";

  export let mon: IndexMonster;

  const catchMon = () => {
    caughtMons.update((mons) => {
      return [...mons, mon];
    });
    console.log("catch pokemon", mon);
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="monster">
  <div on:click={catchMon} on:keydown={catchMon}>
    <div class="monster-content">
      <img src={mon.image} alt={mon.name} />
      {mon.name}
    </div>
    <div class="monster-id">
      {mon.id}
    </div>
  </div>
</div>

<style>
  .monster-id {
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 0.8em;
    color: #aaa;
  }

  .monster {
    width: 100px;
    margin: 10px;
    padding: 10px;
    position: relative;
    background-color: #eee;
  }

  .monster:hover {
    background-color: #ddd;
    cursor: pointer;
  }

  .monster-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
