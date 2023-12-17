<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated>
      <q-toolbar>
        <div class="q-ml-auto">
          Vladyslav Volynchuk
          <a href="https://github.com/volynchuk18" target="_blank">
            <q-img
              class="q-ml-sm"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              style="height: 25px; width: 25px"
            ></q-img>
          </a>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
</script>
