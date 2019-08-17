<template>
  <div>
    <header>
      <router-link to="/">
        <figure class="p-3 p-md-2 logo">
          <img src="../assets/logo.png" alt="logo" />
        </figure>
      </router-link>
      <div
        class="header-content d-flex flex-column align-items-center justify-content-center"
      >
        <div class="d-flex align-content-center justify-content-between title">
          <img src="../assets/logo.png" alt="Starwars" />
          <h1>Directory</h1>
        </div>
        <p>
          Find your favourite Characters, Films, Species, Starships and Planets
        </p>
        <form class="form-inline flex-grow-1 m-h-5">
          <div class="input-group d-flex ">
            <div class="input-group-prepend">
              <button class="btn bg-light p-h-5" type="submit">
                <font-awesome-icon icon="search" />
              </button>
            </div>
            <input
              class="form-control form-control-lg bg-light"
              type="search"
              placeholder="Enter a search term"
              aria-label="Search"
            />
          </div>
        </form>
      </div>
    </header>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
header {
  color: white;
  padding: 30px;
  background: url("../assets/hero-banner.jpg");
  img {
    height: 50px;
  }
  @media screen and (max-height: 576px) {
    img {
      height: 30px;
    }
  }
  .header-content {
    padding: 30px;
    div {
      width: auto !important;
    }
    .title {
      h1 {
        color: white;
        font-weight: bold;
        padding-left: 15px;
      }
      width: auto;
      border-bottom: 2px solid white;
    }
    p {
      padding: 15px;
      font-size: 120%;
      max-width: 500px;
      text-align: center;
    }
    button {
      img {
        height: 20px;
      }
    }
    input {
      min-width: 25vw;
    }
    margin-bottom: 30px;
  }
}
</style>
