<script setup>
	import { ref } from 'vue';
	import CommentSection from './components/CommentSection.vue';

	const userId = ref('');
	const users = ref(null);
	const newEmail = ref('');

	const getUser = async () => {
		const response = await fetch(
			`http://20.3.240.51:3000/api/user/${userId.value}`
		);
		users.value = await response.json();
	};

	const changeEmail = async () => {
		await fetch(
			`http://20.3.240.51:3000/api/user/${userId.value}/change-email`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', // Menggunakan JSON
				},
				body: JSON.stringify({ email: newEmail.value }), // Mengirim data dalam format JSON
			}
		);
	};
</script>

<template>
	<div id="app">
		<h1>User Dashboard</h1>
		<div>
			<input
				v-model="userId"
				placeholder="Enter User ID" />
			<button @click="getUser">Get User Info</button>
		</div>
		<div v-if="users">
			<template v-for="user in users">
				<h2>{{ user.name }}</h2>
				<p>Email: {{ user.email }}</p>
				<hr />
			</template>
		</div>
		<CommentSection />
		<form @submit.prevent="changeEmail">
			<h3>Change Email</h3>
			<input
				v-model="newEmail"
				placeholder="New Email" />
			<button type="submit">Submit</button>
		</form>
	</div>
</template>
