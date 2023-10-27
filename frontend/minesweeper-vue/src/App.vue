<template>
  <div class="App">
    <div>
      <router-view/>
    </div>
  </div>
</template>


<!--   ROUTES:
  / -> LandingPage
  /join -> JoinGame
  /create -> CreateGame
  /lobby -> Lobby -->

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: #3a3861;
  height: 100vh;
  width: 100vw;
  margin: 0;
  min-height: 100%;
}
</style>