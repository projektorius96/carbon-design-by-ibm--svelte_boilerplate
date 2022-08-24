<!-- App.svelte -->
<script>
    // import "./carbon-components-svelte/css/all.css"; /* [ISSUE] : SOMEWHY DOES NOT LOAD ; please refer to [1^SOLUTION] */
    import { Button } from "carbon-components-svelte";
</script>

<!-- [1^SOLUTION] : link style through svelte:head -->
<svelte:head>
    <link
        rel="stylesheet"
        href="./carbon-components-svelte/css/all.css"
    />
</svelte:head>

<Button kind="primary">CARBON BY IBM</Button>

