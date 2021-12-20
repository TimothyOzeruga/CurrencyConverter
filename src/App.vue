<template>
  <div id="nav">
    <router-link to="/">Converter</router-link>
    <router-link to="/about">All Currencies</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#nav {
  padding: 2rem;
  background: rgb(53, 100, 189);
  display: flex;
  justify-content: center;

  a {
    padding: .5rem;
    font-weight: bold;
    color: #181f27;
    font-size: 20px;
    margin-right: 10px;

    &.router-link-exact-active {
      color: #42b956;
    }
    &:hover{
      color: rgb(220, 150, 20);
    }
    
  }
}
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html,
body {
    width: 100%;
    height: 100%;
}
.container{
  width: 90%;
  max-width: 1170px;
  margin: 0 auto;
}
ul,
ol {
    list-style: none;
}

img {
    vertical-align: top;
}

a,
button {
    text-decoration: none;
    cursor: pointer;
    transition: all .2s ease;
}
</style>
