<template>
<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <NuxtLink to="/gallery">
                    Gallery
                  </NuxtLink>
                </li>
            <li>
                  <NuxtLink to="/flagquiz">
                    Flagquiz
                  </NuxtLink>
                </li>
          </ul>
    </div>
    <button class="btn-ghost btn font-permanentmarker text-xl normal-case text-kaldi">
          <NuxtLink to="/">
            paget.dk
          </NuxtLink>
          <Icon name="noto:ninja-light-skin-tone" />
        </button>

  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li>
                  <NuxtLink to="/gallery">
                    Gallery
                  </NuxtLink>
                </li>
            <li>
                  <NuxtLink to="/flagquiz">
                    Flagquiz
                  </NuxtLink>
                </li>
          </ul>
  </div>
  <div class="navbar-end">
    <div v-if="user" class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost">
        <div class="avatar placeholder">
          <div class="bg-neutral text-neutral-content w-8 rounded-full">
            <span>{{ user?.email?.charAt(0).toUpperCase() }}</span>
          </div>
        </div>
      </div>
      <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <NuxtLink to="/profile">
            Profile
          </NuxtLink>
        </li>
        <li>
          <a @click="signOut">Sign out</a>
        </li>
      </ul>
    </div>
    <NuxtLink v-else to="/login" class="btn btn-primary">
      Sign in
    </NuxtLink>
  </div>
</div>
</template>

<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const signOut = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>