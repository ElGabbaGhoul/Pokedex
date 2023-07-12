<script lang="ts">
  import type { PageData } from "./$types";
  import type { IndexMonster } from "./+page";
  import { page } from "$app/stores";
  import { generations } from "./generations";
  import { goto } from "$app/navigation";
  import Monster from "./Monster.svelte";

  export let data: PageData;

  let searchString = "";
  $: selectedMons = data.mons.filter((mon: IndexMonster) => {
    return mon.name.toLowerCase().includes(searchString.toLowerCase());
  });

  $: monId = $page.url.searchParams.get("monId") || "";
  $: mon = data.mons.find((mon) => mon.id === monId);
  $: monId2 = $page.url.searchParams.get("monId2") || "";
  $: mon2 = data.mons.find((mon) => mon.id === monId2);

  $: selectedGenerationId = $page.url.searchParams.get("generation_id") || "";
  // const monsterClick = (mon: IndexMonster) => {
  //   monId = mon.id;
  //   goto(`?monId=${monId}`);
  // };

  const updateSearchParams = (key: string, value: string) => {
    const searchParams = new URLSearchParams($page.url.searchParams);
    searchParams.set(key, value);
    goto(`?${searchParams.toString()}`);
  };

  let form = {
    searchString: "",
  };

  const submitSearch = (e: Event) => {
    searchString = form.searchString;
  };
</script>

{#if mon}
  <Monster {mon} {updateSearchParams} />
{/if}
{#if mon2}
  <Monster mon={mon2} {updateSearchParams} />
{/if}

<div class="generations">
  <button
    class="generation"
    class:active={selectedGenerationId == "all"}
    on:click={() => updateSearchParams("generation_id", "all")}>All</button
  >
  {#each generations as generation (generation.id)}
    <button
      class="generation"
      class:active={selectedGenerationId === generation.id.toString()}
      on:click={() =>
        updateSearchParams("generation_id", generation.id.toString())}
    >
      <p>{generation.main_region}</p>
    </button>
  {/each}
</div>

<form class="search-form" on:submit|preventDefault={submitSearch}>
  <input
    class="search-field"
    type="text"
    bind:value={form.searchString}
    placeholder="Pokémon Name"
  />
  <input type="submit" value="Search" />
</form>

<div class="monsters">
  {#each selectedMons as mon (mon.id)}
    <Monster {mon} {updateSearchParams} isInteractive={true} />
  {/each}
</div>

<style>
  .generations {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    height: auto;
  }

  .generation {
    margin: 2px;
    padding: 2px 5px;
    border-radius: 25%;
    border: 1px solid #bcb3f8;
    background-color: #f9f9f9;
    color: #333;
    line-height: 0.05;
  }

  .generation.active {
    background-color: #333;
    color: #bcb3f8;
  }
  .generation.active:hover {
    background-color: #bcb3f8;
    color: #333;
  }

  .generation:hover {
    background-color: #bcb3f8;
    cursor: pointer;
  }

  .monsters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .search-form {
    display: flex;
    justify-content: center;
    margin: 20px 0px;
  }

  .search-form input[type="text"] {
    padding: 5px 10px;
    border: 1px solid #333;
    border-radius: 5px;
    width: 200px;
  }

  .search-form input[type="submit"] {
    padding: 5px 10px;
    border: 1px solid #333;
    border-radius: 5px;
    margin-left: 10px;
    background-color: #ddd;
    color: #333;
    cursor: pointer;
  }

  .search-form input[type="submit"]:hover {
    background-color: #bcb3f8;
  }
  .search-form input[type="submit"]:active {
    background-color: #333;
    color: #ddd;
  }
</style>
