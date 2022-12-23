<style>
    /* @import "carbon-components-svelte/css/all.css"; */ /* in case it does not load, refer to [1^SOLUTION] */
</style>

<script>
    import { onMount } from 'svelte';
    import { Button } from "carbon-components-svelte";

    onMount(async()=>{
        await import("carbon-components-svelte/css/white.css")
    })
</script>

<!-- [1^SOLUTION] : link style through svelte:head tags -->
<!-- <svelte:head>
    <link
        rel="stylesheet"
        href="./carbon-components-svelte/css/all.css"
    />
</svelte:head> -->

<Button kind="primary">CARBON BY IBM</Button>
<Button kind="secondary">CARBON BY IBM</Button>

