<script lang="ts">
  import type { IndexMonster } from "./+page";

  export let mon: IndexMonster;
  export let updateSearchParams: (key: string, value: string) => void;
  export let isInteractive: boolean = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="monster">
  <div
    on:click={() =>
      isInteractive ? updateSearchParams("monId", mon.id) : null}
    on:keydown={() =>
      isInteractive ? updateSearchParams("monId", mon.id) : null}
  >
    <div class="monster-content">
      <img src={mon.image} alt={mon.name} />
      {mon.name}
    </div>
    <div class="monster-id">
      {mon.id}
    </div>
  </div>
  {#if isInteractive}
    <div
      on:click={() => updateSearchParams("monId2", mon.id)}
      on:keydown={() => updateSearchParams("monId", mon.id)}
    >
      Add Monster 2
    </div>
  {/if}
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
