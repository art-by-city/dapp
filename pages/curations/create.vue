<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <h1>Create Curation</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form ref="form" :disabled="pending">
          <v-text-field
            v-model="title"  
            label="Title"
            placeholder="My Curation Title"
            :rules="[rules.required]"
          ></v-text-field>

          <v-textarea
            v-model="description"
            label="Description"
            placeholder="My Curation Description"
          ></v-textarea>

          <v-btn
            color="primary"
            variant="outlined"
            elevation="2"
            @click.prevent="create"
          >
            Create
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { VForm } from 'vuetify/lib/components/index.mjs'
import { useAuthStore } from '~/stores/auth'

const abc = useArtByCity()
const auth = useAuthStore()
const router = useRouter()
const pending = ref(false)
const form = ref<VForm | null>(null)
const title = ref('')
const description = ref('')

const rules = {
  required: (value: string) => !!value || 'Required'
}

const create = debounce(async () => {
  if (!auth.address) { return }
  if (pending.value) { return }
  if (!form.value) { return }

  const { valid } = await form.value.validate()
  if (!valid) { return }

  pending.value = true

  try {
    const curationId = await abc
      .connect()
      .curations
      .create('collaborative-whitelist', {
        owner: auth.address,
        title: title.value,
        description: description.value
      })

    console.log('new curation id', curationId)
    await router.push(`/curations/${curationId}`)
  } catch (error) {
    console.error('Error creating curation', error)
  }

  pending.value = false
})
</script>
