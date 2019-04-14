<template>
  <v-flex xs12 sm10 offset-sm1>
      <div id="account-info" class="text-xs-center">
            <v-avatar size="96px">
            <img
                class="img-circle elevation-7 mb-1"
                src="@/assets/logo.png"
            >
            </v-avatar>
            <div class="name"> <span style="font-weight:bold">Todoy-web</span></div>
            <div class="email text-xs-center grey--text pt-1 pb-3">v1.0.0</div>
            <v-layout justify-space-between>
            </v-layout>
        </div>
    </v-flex>
</template>
<script>
export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>