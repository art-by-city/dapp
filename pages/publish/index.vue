<template>
  <v-container>
    <v-row>
      <v-col class="pt-0">
        <h1>Publish Your Art</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="solid-border">
          <v-img v-if="selectedImageURL" :src="selectedImageURL" />
          <FileInputButton v-else @update="onFilesAdded" />
        </v-card>
      </v-col>
      <v-col
        v-for="{ file, url } in filesToUpload"
        :key="url"
        cols="1"
      >
        <v-card
          class="preview-container solid-border"
          @click="selectedImageURL = url"
        >
          <v-img :src="url" />
        </v-card>
      </v-col>
      <v-col v-if="filesToUpload.length > 0" cols="1">
        <FileInputButton @update="onFilesAdded" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col sm="11" class="pa-0 pt-sm-3 px-sm-3">
            <v-text-field variant="outlined" density="compact" label="Title" />
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
    </v-row>

  </v-container>
</template>

<style scoped>
.solid-border {
  border-color: black;
  border-width: 1px;
}
.preview-container {
  cursor: pointer;
  /* border: 1px solid black; */
}
</style>

<script setup lang="ts">
type FileWithURL = {
  file: File
  url: string
}

const filesToUpload = ref<FileWithURL[]>([])
const selectedImageURL = ref<string>('')
// const c = <HTMLCanvasElement> document.getElementById("previewCanvas")
// const img = document.createElement('img')
// const data = []
// data.push(fileUpload.value[0])
// if (fileUpload) {
//   console.log(typeof fileUpload.value[0])
//   const path = URL.createObjectURL(fileUpload.value[0])
//   img.src = path
// }
// const ctx = c?.getContext("2d") 
// ctx?.drawImage(img, 0, 0, img.width, img.height)

const onFilesAdded = async (files: FileWithURL[]) => {
  console.log('got file(s)', files.length, files)

  filesToUpload.value = files

  // Update selected image for preview
  selectedImageURL.value = filesToUpload.value.at(0)?.url || ''
}

const publish = () => {
  // console.log(typeof fileUpload.value[0])
}

</script>
