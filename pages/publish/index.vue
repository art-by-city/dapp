<template>
  <v-container>
    <v-row>
      <v-col class="pt-0">
        <h1>Publish Your Art</h1>
      </v-col>
    </v-row>
    <v-form
      v-model="validForm"
      @submit.prevent
    >
      <!-- File upload and preview -->
      <v-row>
        <v-col cols="12">
          <v-card class="solid-border">
            <v-img
              v-if="selectedImageURL"
              :src="selectedImageURL"
            />
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

      <v-row>
        <v-col cols="12">
          <model-viewer v-show="filesToUpload.length > 0" ref="modelViewer" :src="filesToUpload[0].url" />
        </v-col>
      </v-row>

      <!-- Metadata -->
      <v-row>
        <v-col cols="12">
          <!-- Title -->
          <v-row>
            <v-col sm="12" class="pa-0 pt-sm-3 px-sm-3">
              <v-text-field
                v-model="artMetadata.title"
                variant="outlined"
                density="compact"
                label="Title"
                counter="128"
                :rules="[rules.required, rules.maxLength(128)]"
              />
            </v-col>
          </v-row>

          <!-- Description -->
          <v-row>
            <v-col sm="12" class="pa-0 pa-sm-3 py-sm-0">
              <v-textarea
                v-model="artMetadata.description"
                variant="outlined"
                label="Description"
                counter="1024"
                :rules="[rules.maxLength(1024)]"
              />
            </v-col>
          </v-row>

          <!-- Year, Medium, Genre -->
          <v-row>
            <v-col sm="2" class="pa-0 pr-1 pa-sm-3 py-sm-0">
              <v-text-field
                v-model="artMetadata.year"
                variant="outlined"
                density="compact"
                label="Year"
                :rules="[rules.year]"
              />
            </v-col>
            <v-col sm="12" class="pa-0 pa-sm-3 py-sm-0">
              <v-text-field
                v-model="artMetadata.medium"
                variant="outlined"
                density="compact"
                label="Medium"
                counter="240"
                :rules="[rules.maxLength(240)]"
              />
            </v-col>
            <v-col sm="12" class="pa-0 pl-1 pa-sm-3 py-sm-0">
              <v-text-field
                v-model="artMetadata.genre"
                variant="outlined"
                density="compact"
                label="Genre"
                counter="240"
                :rules="[rules.maxLength(240)]"
              />
            </v-col>
          </v-row>

          <!-- Tags -->
          <!-- <v-row>
            <v-col sm="4" class="pa-0 pa-sm-3 py-sm-0">
              <v-text-field
                v-model="artMetadata.tags"
                variant="outlined"
                density="compact"
                label="Tags"
                counter="100"
              />
            </v-col>
          </v-row> -->

          <!-- License -->
          <!-- <v-row>
            <v-col sm="4" class="pa-0 pa-sm-3 py-sm-0" style="font-size: 5px;">
              <v-text-field
                v-model="artMetadata.license"
                variant="outlined"
                density="compact"
                label="License"
                counter="50"
              />
            </v-col>
          </v-row> -->

          <!-- Publish Button -->
          <v-row>
            <v-col cols="2">
              <v-btn
                :loading="loading"
                type="submit"
                @click="publish"
              >
                PUBLISH
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                :loading="loading"
                @click="router.go(0)"
              >
                CANCEL
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span
                :class="publishActionColor"
              >
                {{ publishActionText }}
              </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
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
import '@google/model-viewer'
import { ModelViewerElement } from '@google/model-viewer'

const router = useRouter()
type FileWithURL = {
  file: File
  url: string
}

type ArtDetails = {
  title: string,
  description: string,
  year?: string,
  medium?: string,
  genre?: string,
  // tags?: string[],
  // license?: string
}

const filesToUpload = ref<FileWithURL[]>([])
const selectedImageURL = ref<string>('')
const loading = ref(false)
const validForm = ref(false)
const fileType = ref('')
const modelViewer = ref<ModelViewerElement>()
const artMetadata = ref<ArtDetails>({
  title: '',
  description: '',
  year: '',
  medium: '',
  genre: '',
  // tags: [],
  // license: ''
})

const onFilesAdded = (files: FileWithURL[]) => {
  console.log('got file(s)', files.length, files)
  
  filesToUpload.value = files

  fileType.value = checkFileType(filesToUpload.value[0].file)

  // if (fileType.value == 'model') {
  //   selectedImageURL.value = modelViewer.value?.toDataURL() as string
  //   console.log(selectedImageURL.value)
  // }

  // console.log(selectedImageURL.value)

  // Update selected image for preview
  // selectedImageURL.value = filesToUpload.value.at(0)?.url || ''

}

const checkFileType = (file: File) => {
  const fileNameParts = file.name.split('.')
  const fileExt = fileNameParts[fileNameParts.length - 1]

  if (file.type.match('image.*')) {
    return 'image'
  }

  if (file.type.match('audio.*')) {
    return 'audio'
  }

  if (file.type.match('model.*') || fileExt.match('gltf') || fileExt.match('glb')) {
    return 'model'
  }

  return 'unknown'
}

const publishActionText = ref<string>('')
const publishActionColor = ref<string>('')

const successTest = () => {
  publishSuccess()
  loading.value = false
  logInput()
}

const failTest = () => {
  publishFailure()
  loading.value = false
  logInput()
}

const publish = debounce(() => {
  loading.value = true
  // Validate input
  if (validForm.value) {
    setTimeout(successTest, 1000)
  } else {
    failTest()
  }
  // Attempt to publish art

  // Catch any errors

  // Show success if no errors
  
  // Navigate to art page when done
  //    Go to: /owner/artworkSlugOrID
})

const publishSuccess = () => {
  publishActionColor.value = 'text-green'
  console.log("Published artwork successfully!")
  publishActionText.value = 'Successfully published your artwork!'
}

const publishFailure = () => {
  publishActionColor.value = 'text-red'
  console.log("Publishing artwork failed.")
  publishActionText.value = 'Error: Failed to publish artwork.'
}

const logInput = () => {
  console.log("Title", artMetadata.value.title)
  console.log("Description", artMetadata.value.description)
  console.log("Year", artMetadata.value.year)
  console.log("Medium", artMetadata.value.medium)
  console.log("Genre", artMetadata.value.genre)
}

const rules = {
  required: (value: string = '') => value.length < 1 ? 'Required' : true,
  minLength: (minLength: number) => (value: string = '') => {
    if (!value) {
      return true
    }
    return value.length < minLength
      ? `Minimum 3 characters`
      : true
  },
  maxLength: (maxLength: number) => (value: string = '') => {
    return value.length > maxLength
      ? `Maximum ${maxLength} characters`
      : true
  },
  city: (value: string = '') => {
    if (!value) {
      return true
    }

    const validCityCodeRegex = /^[a-zA-Z]{3}$/

    if (!validCityCodeRegex.test(value)) {
      return 'Must be a valid city code'
    }

    return true
  },
  year: (value: string = '') => {
    if (!value) {
      return true
    }

    const year = Number.parseInt(value)

    if (
      Number.isNaN(year)
      || year > (new Date()).getFullYear()
      || year < 1000
    ) {
      return 'Must be a valid year'
    }

    return true
  },
  slug: (value: string = '') => {
    const validSlugRegex = /^[a-z0-9]+(?:[-_\.]*[a-z0-9]+)*$/

    if (!validSlugRegex.test(value)) {
      return 'Must be a valid URL slug'
        + ' (lowerchase alphanumerics, hyphen, underscore, period),'
        + ' must not end with a hyphen, underscore, or period'
    }

    return true
  }
}
</script>
