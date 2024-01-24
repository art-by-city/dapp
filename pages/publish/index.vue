<template>
  <v-container>
    <v-row>
      <v-col class="pt-0">
        <h1>Publish Your Art</h1>
      </v-col>
    </v-row>

    <!-- File upload and preview -->
    <v-row>
      <v-col cols="12">
        <v-card class="solid-border">
          <v-img v-if="selectedImageURL" :src="selectedImageURL" />
          <FileInputButton v-else @update="onFilesAdded" />
        </v-card>
      </v-col>
      <!-- <v-col
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
      </v-col> -->
      <v-col v-if="filesToUpload.length > 0" cols="1">
        <FileInputButton @update="onFilesAdded" />
      </v-col>
    </v-row>

    <!-- Metadata -->
    <v-row>
      <v-col cols="12">
        
        <!-- Title -->
        <v-row>
          <v-col sm="11" class="pa-0 pt-sm-3 px-sm-3">
            <v-text-field
              v-model="artMetadata.title"
              variant="outlined"
              density="compact"
              label="Title" />
          </v-col>
        </v-row>

        <!-- Description -->
        <v-row>
          <v-col sm="11" class="pa-0 pa-sm-3 py-sm-0">
            <v-textarea
              v-model="artMetadata.description"
              variant="outlined"
              label="Description" />
          </v-col>
        </v-row>

        <!-- Year, Medium, Genre -->
        <v-row>
          <v-col sm="2" class="pa-0 pr-1 pa-sm-3 py-sm-0">
            <v-text-field
              v-model="artMetadata.year"
              variant="outlined"
              density="compact"
              label="Year" />
          </v-col>
          <v-col sm="3" class="pa-0 pa-sm-3 py-sm-0">
            <v-text-field
              v-model="artMetadata.medium"
              variant="outlined"
              density="compact"
              label="Medium" />
          </v-col>
          <v-col sm="2" class="pa-0 pl-1 pa-sm-3 py-sm-0">
            <v-text-field
              v-model="artMetadata.genre"
              variant="outlined"
              density="compact"
              label="Genre" />
          </v-col>
        </v-row>

        <!-- Tags -->
        <v-row>
          <v-col sm="4" class="pa-0 pa-sm-3 py-sm-0">
            <v-text-field
              v-model="artMetadata.tags"
              variant="outlined"
              density="compact"
              label="Tags"
            />
          </v-col>
        </v-row>

        <!-- License -->
        <v-row>
          <v-col sm="4" class="pa-0 pa-sm-3 py-sm-0" style="font-size: 5px;">
            <v-text-field
              v-model="artMetadata.license"
              variant="outlined"
              density="compact"
              label="License"
            />
          </v-col>
        </v-row>

        <!-- Publish Button -->
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
}
</style>

<script setup lang="ts">
type FileWithURL = {
  file: File
  url: string
}

const filesToUpload = ref<FileWithURL[]>([])
const selectedImageURL = ref<string>('')
interface ArtDetails {
  title: string,
  description: string,
  year?: string,
  medium?: string,
  genre?: string,
  tags?: string[],
  license?: string
}
const artMetadata: ArtDetails = {
  title: '',
  description: '',
  year: '',
  medium: '',
  genre: '',
  tags: [],
  license: ''
}
const testSuccess = true

const onFilesAdded = async (files: FileWithURL[]) => {
  console.log('got file(s)', files.length, files)

  filesToUpload.value = files

  // Update selected image for preview
  selectedImageURL.value = filesToUpload.value.at(0)?.url || ''
}

const publish = debounce(() => {
  // Validate input

  // Attempt to publish art

  // Catch any errors

  // Show success if no errors
  return testSuccess
  // Navigate to art page when done
  //    Go to: /owner/artworkSlugOrID
})

const publishSuccess = () => {
  console.log("Published successfully.")
  
}
</script>
