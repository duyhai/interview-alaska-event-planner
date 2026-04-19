<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="max-w-4xl mx-auto p-6 bg-gray-200 font-sans h-screen">
	{@render children()}
</main>
