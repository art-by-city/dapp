<template>
  <v-container>
    <v-row>
      <v-col class="pt-0">
        <h1>Publish Your Art</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">      
        <v-row>
          <v-col sm="11" class="pa-0 pt-sm-3 px-sm-3">
            <v-text-field variant="outlined" density="compact" label="Title" />
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="6" class="pa-0 pa-sm-3 py-sm-0">
            <v-file-input
              v-model="fileUpload"
              multiple
              density="compact"
              label="File input" />
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="7" class="pa-0 pa-sm-3 py-sm-0">
            <v-textarea variant="outlined" label="Description" />
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" class="pa-0 pr-1 pa-sm-3 py-sm-0">
            <v-text-field variant="outlined" density="compact" label="Year" />
          </v-col>
          <v-col sm="3" class="pa-0 pa-sm-3 py-sm-0">
            <v-text-field variant="outlined" density="compact" label="Medium" />
          </v-col>
          <v-col sm="2" class="pa-0 pl-1 pa-sm-3 py-sm-0">
            <v-text-field variant="outlined" density="compact" label="Genre" />
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="4" class="pa-0 pa-sm-3 py-sm-0">
            <v-text-field variant="outlined" density="compact" label="Tags" />
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="4" class="pa-0 pa-sm-3 py-sm-0" style="font-size: 5px;">
            <v-text-field variant="outlined" density="compact" label="License" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn @click="publish">
              PUBLISH
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <canvas id="previewCanvas" width="500" height="500" style="border: 1px solid black;">
          Your browser does not support the HTML 5 Canvas. 
        </canvas>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script setup lang="ts">
const fileUpload = ref<File[]>([])
const c = <HTMLCanvasElement> document.getElementById("previewCanvas")
const img = document.createElement('img')
// const data = []
// data.push(fileUpload.value[0])
if (fileUpload) {
  console.log(typeof fileUpload.value[0])
  const path = URL.createObjectURL(fileUpload.value[0])
  img.src = path
}
const ctx = c?.getContext("2d") 
ctx?.drawImage(img, 0, 0, img.width, img.height)

const publish = () => {
  console.log(typeof fileUpload.value[0])
}

</script>
