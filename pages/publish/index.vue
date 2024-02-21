<template>
  <v-container>
    <v-row>
      <v-col class="pt-0">
        <h1>Publish</h1>  
      </v-col>
    </v-row>
    <v-form
      ref="form"
      v-model="isFormValid"
      :disabled="isFormDisabled"
      @submit.prevent
    >
      <!-- File upload and preview -->
      <v-row>
        <v-col cols="12">
          <v-card
            v-if="!audioSrc"
            class="solid-border"
            elevation="0"
            height="300"
            max-height="300"
          >
            <FilePreviewCard
              v-if="selectedImageURL"
              :src="selectedImageURL"
              @remove="onRemoveClicked"
            />
            <FileInputButton
              v-else
              @update="onFilesAdded"
            />
          </v-card>
          <!-- <v-card v-if="audioSrc" class="solid-border">
            <v-img
              v-if="selectedImageURL"
              :src="selectedImageURL"
            />
            <FileInputButton v-else @update="onAudioImageAdded" />
          </v-card>
          <v-row v-if="audioSrc">
            <v-col>
              <div class="audio-container mt-2">
                <audio controls :src="audioSrc" controlsList="nodownload" />
              </div>
            </v-col>
          </v-row> -->
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
        <!-- <v-col v-if="filesToUpload.length > 0" cols="3">
          <FileInputButton @update="onFilesAdded" />
          <span v-if="audioSrc">Change Audio File</span>
        </v-col> -->
        <!-- <v-col v-if="audioSrc && audioImageToUpload.length > 0" cols="auto">
          <FileInputButton @update="onAudioImageAdded" />
          <span>Change Image File</span>
        </v-col> -->
      </v-row>

      <v-row v-show="modelSrc" justify="center">
        <v-col cols="12">
          <ThreeDModel
            ref="modelViewer"
            class="model-viewer-container"
            :src="modelSrc"
            rotation-per-second="0rad"
          />
        </v-col>
      </v-row>

      <v-row v-if="modelSrc">
        <v-col cols="3">
          <v-btn
            :loading="loading"
            @click="getModelScreenShot"
          >
            Take Screenshot
          </v-btn>
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

          <!-- Medium, Genre -->
          <v-row>
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
                color="error"
                variant="outlined"
                elevation="2"
                density="compact"
                :loading="loading"
                @click="onCancelClicked"
              >
                CANCEL
              </v-btn>
            </v-col>
            <v-col offset="8" cols="2" class="text-right">
              <v-btn
                color="primary"
                variant="outlined"
                elevation="2"
                density="compact"
                :loading="loading"
                type="submit"
                @click="onPublishClicked"
              >
                PUBLISH
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

  <v-dialog v-model="isCancelDialogOpen" width="auto">
    <v-card>
      <v-card-text>
        Are you sure you want to reset this publication?
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          variant="outlined"
          elevation="2"
          density="compact"
          @click="onCancelModalAborted"
        >NO</v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          variant="outlined"
          elevation="2"
          density="compact"
          @click="onCancelModalConfirmed"
        >YES, RESET</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="isConfirmDialogOpen" width="auto">
    <v-card>
      <v-card-text>
        TODO: Transaction summary here
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="error"
          variant="outlined"
          elevation="2"
          density="compact"
          @click="onTransactionAborted"
        >CANCEL</v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          variant="outlined"
          elevation="2"
          density="compact"
          @click="onTransactionConfirmation"
        >PUBLISH</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <canvas ref="resizerCanvas" class="resizer-canvas" />
</template>

<style scoped>
.solid-border {
  border-color: black;
  border-width: 1px;
}
.preview-container {
  cursor: pointer;
}
.audio-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.model-viewer-container {
  min-width: 50vw;
  min-height: 50vh;
}
.resizer-canvas {
  display: none;
}
</style>

<script setup lang="ts">
import {
  BasePublicationOptions,
  ImageMimeTypes,
  ImagePublicationOptions,
  PublishingImage,
  PublishingThumbnail
} from '@artbycity/sdk/dist/web/publications'
import Transaction from 'arweave/web/lib/transaction'
import { VForm } from 'vuetify/components'

import ThreeDModelVue from './components/ThreeDModel.vue'

const abc = useArtByCity()
const router = useRouter()

type FileWithURL = {
  file: File
  url: string
}

// type ArtDetails = {
//   title: string,
//   description?: string,
//   year?: string,
//   medium?: string,
//   genre?: string,
//   // tags?: string[],
//   // license?: string
// }
const resizerCanvas = ref<HTMLCanvasElement>()
const form = ref<VForm>()
const isFormValid = ref(false)
const isCancelDialogOpen = ref(false)
const isConfirmDialogOpen = ref(false)
const transaction = ref<Transaction>()
const filesToUpload = ref<FileWithURL[]>([])
const audioImageToUpload = ref<FileWithURL[]>([])
const selectedImageURL = ref<string>('')
const loading = ref(false)
const isFormDisabled = ref(false)
const fileType = ref('')
const modelViewer = ref<InstanceType<typeof ThreeDModelVue>>()
const artMetadata = ref<BasePublicationOptions>({
  type: 'image',
  title: '',
  slug: '', // TODO -> generate slug from title, but let user modify
  description: '',
  topics: [],
  city: '',
  medium: '',
  genre: ''
})
const publishActionText = ref<string>('')
const publishActionColor = ref<string>('')

const reset = () => {
  filesToUpload.value = []
  fileType.value = ''
  selectedImageURL.value = ''
}

const onFilesAdded = (files: FileWithURL[]) => {
  console.log('got file(s)', files.length, files)
  filesToUpload.value = files
  fileType.value = checkFileType(filesToUpload.value[0].file)
  if (fileType.value == 'image') {
    selectedImageURL.value = filesToUpload.value.at(0)?.url || ''
  }
}

const onRemoveClicked = () => reset()

const onAudioImageAdded = (file: FileWithURL[]) => {
  audioImageToUpload.value = file

  const checkType = checkFileType(audioImageToUpload.value[0].file)

  if (checkType == 'image') {
    selectedImageURL.value = audioImageToUpload.value.at(0)?.url || ''
  }
}

const checkFileType = (file: File) => {
  const fileNameParts = file.name.split('.')
  const fileExt = fileNameParts[fileNameParts.length - 1]

  if (file.type.match('image.*')) { return 'image' }
  if (file.type.match('audio.*')) { return 'audio' }
  if (file.type.match('model.*')
    || fileExt.match('gltf')
    || fileExt.match('glb')) { return 'model' }

  return 'unknown'
}

const audioSrc = computed(() => {
  if (fileType.value == 'audio' && filesToUpload.value.length > 0) {
    return filesToUpload.value[0].url
  }

  return false
})

const modelSrc = computed(() => {
  if (fileType.value == 'model' && filesToUpload.value.length > 0) {
    return filesToUpload.value[0].url
  }

  return ''
})

const getModelScreenShot = async () => {
  if (modelViewer.value) {
    const blobby = await modelViewer.value.getBlob()
    selectedImageURL.value = URL.createObjectURL(blobby)
  }
}

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

const onCancelClicked = debounce(() => isCancelDialogOpen.value = true)
const onCancelModalConfirmed = debounce(() => router.go(0))
const onCancelModalAborted = debounce(() => isCancelDialogOpen.value = false)
const onPublishClicked = debounce(async () => {
  loading.value = true

  const validationResult = await form.value?.validate()

  if (!validationResult?.valid || filesToUpload.value.length < 1) {
    loading.value = false
    return
  }

  // Validate input tests
  // if (isFormValid.value) {
  //   setTimeout(successTest, 1000)
  // } else {
  //   failTest()
  // }
  
  try {
    const primaryFile = filesToUpload.value[0].file

    // TODO -> Create thumbnails with resizerCanvas
    const small: PublishingThumbnail = {
      type: 'image/jpeg',
      data: 'TODO',
      size: 0, // TODO
      name: 'TODO',
      lastModified: 0 // TODO
    }
    const large: PublishingThumbnail = {
      type: 'image/jpeg',
      data: 'TODO',
      size: 0, // TODO
      name: 'TODO',
      lastModified: 0 // TODO
    }
    const primary: PublishingImage = {
      type: primaryFile.type as ImageMimeTypes,
      data: await readFileAsync(primaryFile),
      size: primaryFile.size,
      // TODO -> name will be the filename on ArFS/ardrive, let user modify
      name: primaryFile.name,
      lastModified: primaryFile.lastModified,
      small,
      large
    }
    const publicationOptions: ImagePublicationOptions = {
      ...artMetadata.value,
      type: 'image',
      primary
    }

    // const {
    //   bundleTxId,
    //   primaryAssetTxId,
    //   primaryMetadataTxId,
    //   tx
    // } = await abc
    //   .connect()
    //   .publications
    //   .create(publicationOptions)

    // transaction.value = tx
  } catch (error) {
    // TODO -> Handle any errors
    console.error('Error publishing', error)
  }

  // TODO -> Show transaction summary / cost / breakdown (confirmation modal?)
  isConfirmDialogOpen.value = true
})

const onTransactionConfirmation = debounce(async () => {
  // TODO -> Attempt to post transaction
  
  // TODO -> On error, update UI to inform user

  // TODO -> On success, navigate to art page when done
  //    Go to: /owner/artworkSlugOrID
})

const onTransactionAborted = debounce (async () => {
  isConfirmDialogOpen.value = false
  loading.value = false
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
