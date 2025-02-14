<template>
	<!--if not authenticated, tell them they need to authenticate-->
	<button v-if="!isAuthenticated" @click="submitLogin()">Login HERE</button>
</template>
<script src="./LoginView.ts" />

<style src="./LoginView.scss" />
