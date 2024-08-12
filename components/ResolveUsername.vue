<!-- <template>
  <nuxt-link
    v-if="!noLink"
    class="text-primary"
    :to="`/${user?.username || props.address}`"
  >
    <span v-if="user?.profile?.displayName || user?.username">
      {{ user?.profile?.displayName || user?.username }}
    </span>
    <code v-else>
      {{ props.address }}
    </code>
  </nuxt-link>
  <template v-else>
    <span v-if="user?.profile?.displayName || user?.username">
      {{ user?.profile?.displayName || user?.username }}
    </span>
    <code v-else>
      {{ props.address }}
    </code>
  </template>
</template> -->

<template>
  <nuxt-link
    v-if="!noLink && props.address"
    class="text-primary"
    :to="`/${users[props.address as keyof typeof users] || props.address}`"
  >
    <span v-if="users[props.address as keyof typeof users]">
      {{ users[props.address as keyof typeof users] }}
    </span>
    <code v-else>
      {{ props.address }}
    </code>
  </nuxt-link>
  <template v-else>
    <span v-if="users[props.address as keyof typeof users]">
      {{ users[props.address as keyof typeof users] }}
    </span>
    <code v-else>
      {{ props.address }}
    </code>
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{ address?: string, noLink?: boolean}>()
// const abc = useArtByCity()

// const {
//   data: user
// } = useLazyAsyncData(`resolve-username-${props.address}`, async () => {
//   if (!props.address) {
//     return { profile: null, username: null }
//   }

//   const profile = await abc.legacy.fetchProfile(props.address)
//   const username =
//     await abc.usernames.resolveUsernameFromAddress(props.address)
  
//   return { profile, username }
// })

const users = {
  "0EeHrLUiUepAW3IZ8ZrNRu8bxEOlumouTdMYKBPPPTM": "knust.art",
  "1KZdIq1mkiTjb1gf6f5c__MUkheFyU6UK8-MMciSKnE": "higgsboson",
  "1cX5WcLKn2kPWmiXPKbRIPpAWm5YP9H1172HpkYN1QI": "spunkart",
  "1qXUQWHAqdk7JWk8PWcXlkhUdBuSH8hOZ010gVNexbc": "munaytu",
  "2aLkIcBH52s2LtZoyRQC_YaFGGSB2r2yGUtgYM5MjZc": "murkury",
  "3VOaO9LbI-zbta_u5Lw_KOTb-MAcRWikcV4X9fVvqBA": "jarm",
  "3iqkDExLuyVn_Q3ojigg0pWmS_MgQjU_R5LCyo82CkE": "rubicon",
  "3tt4qUpZSL5iFk5kMtu1Q_hgdsxd6FgyuRN37OICJes": "rob",
  "4T0gyN4fDHrKSitSl-sw5_FuxGLg8sysBRsP4OF0I2o": "3d_stage_man",
  "5V9nhSOQ5NeCRw9hAPoTMk8z1WimZfEeOqrbsvX_7-U": "elizabethtubbs",
  "6uzZ2xVslWpFib3BR-J731uogU-FRuKDUifFVRZq8xE": "todcomplex",
  "8Ki2ZXNe373ku9thijG_0tN8XR9B3mRoseGZqF1OpLM": "dankbinder",
  "9XaFpHnpswVxZ7juWnG5iK9tYocYG_EYRf9WRmzbfCQ": "astronation",
  "36Ar8VmyC7YS7JGaep9ca2ANjLABETTpxSeA7WOV45Y": "jim",
  "83cE_sKfvJ2XugWumQZPY8KU9PpWqC8P_CnItpJWXn4": "purselnyc",
  "276ituk07Igo0QzT5sa_ISRXwp04T5RfzBwZHS808h4": "paulmp",
  "A2JEmT4LTk5WeBUFRGESX07OR-FUbtqfdBlBl8ooB64": "klarakopi",
  "AVLvtbpOYQUM6_AAO2H0yG44Wl7A3O_F81YlIGrIaOA": "sull",
  "AuIwEAQiHQHRDEMgXBHtYoJnQUlka2fqZsSvcxnLdE4": "bookwarrior",
  "CxuvfybNxiEPpXGqIbM7tzzdSYOlOW9VOUWkf0FWH4c": "stargeezer",
  "FB38OEe2LaObB4wpCu84NeQ1v7WsM9qltzRJfCZT3tg": "luchguch",
  "FffUfjSCpv2PJhw1P0qzfM1P7xejXPdAQ-2qNWclFTg": "meredithmarsone",
  "IEQHFG7nty3NvgTJB-22TX9iLv_wRBvzawg6dUQ6dM8": "striga",
  "IP6zGbkq6jM_3VkzOiXrErbGisgIQCkkn6TlyFptPPY": "rheannon",
  "IyWaTU4CUbaamvkK6oDNGCuB2pKMe7s3N4015qgY4iM": "jodybossert",
  "LtILfPM8agd7RU6AaQmwh0SFEvxPu-tb06E_iHksvUM": "dabit",
  "Q-47UUx60RSHNKS8jWkJA0DHX--PhGDC_0njFIplraQ": "n0tslide",
  "Qk6U75ZH_Wtwq5BsNSZK35eYq2lUZbVtP_qfif2JeZk": "brecky",
  "RJM8gDmbjPQw71EuN5rDgNQOLqE_WVvTDyqn4dNxZUg": "darsh",
  "TJm7pAxZyJNE8IhYgC1ZEF3RiRI3B5u38REQJU0uy8I": "scott",
  "TpdM8DXFdrcFwlJPv4v-jG1QAMWQi735FktvP74n6D4": "stephenkelly",
  "UZcMu3sc90iBbmOU-LUS7mFsziPGIBLgcHKpB013pnk": "gabrieldisante",
  "Uy2XZ7P7F4zBllF5uPdd1ih9jiQrIGvD3X8L13cc5_s": "artbycity",
  "V1Vw3pLLoo67TNBMxP5SNh0iyoYAqoFLmCTUl2TBR-4": "cranial_origami",
  "X3JpXG7ih3fyOaAqo3JXFBa2PLxKz7Va4v2xKWI23xA": "gds",
  "XMRo2-N6pZZi7vo3A9gg1_ncK3fRuGYheuz7Lo7PH1Y": "oaldamster",
  "YftBIDY3rUeITuEhhXBHCGY77K6VkBj70STjRyGFE4k": "paratect",
  "YiQwzqUom7VYHCQ8WfTiXkHPGsVY7_zVk8fF9SuGYwI": "miceheads",
  "aJIPwBoPqt1FGaa4pRoMotuDZr68PHRAoXe3lUerFTs": "harrymattihukkinen",
  "aYDOU6kEcE3lK7aA-gTmUKHTbLlQnZZXWpv1_i_Uq1U": "kobold",
  "bVa4IblSUZ0_VsqXPcr0e3oF6Q87yJ6EUVsxbwqwWmY": "mechelllord",
  "cbXs6b-7NtpGtI2ed_A8p6sZRa2Ofy9L-hdxFK4EOL0": "dutchbihary",
  "dYRuag6nzcdFXJ02_Ljf8ks-WDUrpAMeSI0agFd_ZBQ": "liz",
  "fnJn1Kk2OTJeAK0cdfi4HLruw-9eaxImxVbnX226uJk": "amy",
  "fsoSa_ZaN32EVo3nmmInaPq-7aZ4TTlWVaaYeNjpZ7A": "jamie",
  "fzZvnOKhZoEC7txjXj-pYx-sSV3NLDLJi9u4BhvzXxU": "ikohaus",
  "gU0ESu0Vm7SVjpjFf4yTSQUxPdC9Y84dOAxGNEVB0ac": "ohlala",
  "hyL5aEp4K7fd7hYEjKxi6caxjyL2UANONOnnnFe7jwc": "daliahammar",
  "i_0lXhTIsKKABEKYNlNTiKtY3QTbo9Dm56uzEvvi85g": "onlyarweave",
  "k4fkc6NDiMmfVR06qX5P5XvAOlLi9J9fgBaa8pLvIBc": "zoran",
  "kxOp1vsQZz-09PI5JGQ4ZQFUS1cFef6RiMRIEtgMtvQ": "libgen",
  "mKRPxOSIe08BddCnrL9en8C3hUGqwA5l1sUZilGsjDg": "monchri",
  "mg2tlAm4WgE7EgjavH09iOU67NwJIAyAFCDXg7RIdfc": "elycolz",
  "nN5tmr6oBh5LBpFyVeq9iTn8NsxNZN9ziWC05PRyXE0": "codink",
  "oDu0duoGgGJrKDaRU7AXnxVCYq-3LIi-jIX26pWThaw": "brendan",
  "od35xAb8aQJjCHeLqg2n85dzSO5qEQSibYWrRgLJ7ko": "nathanwells",
  "pZL40EWklkb9fO-9blbwvymjLUt5T5U31wldAnk-QAM": "bekopi",
  "qoFt_qa74r8rPAIeZVd7wJUdQwLi8_7NvDOxs1dWf3c": "becopro",
  "rxcJhMO1f1PUGUbM3gkBpNVK60iV-qhkqVK7jk2qGGo": "jstarr",
  "x3GW6wfBZ3wHTflETInuzJ5rOv_6JvlFi-dl6yYAr8Y": "slava",
  "xzCrjqG0qjX66T8mGNFyQEKd4qK6clSlp8XVvw2glwE": "maracarmona",
  "ykP865v2o25da4fOR4Nex102tvTd7PXDsbCHPNLZV0o": "stefan",
  "zIe2L7WAptLeDdDUcGPOFtBkItZuRE2wE2GQh2LfFqc": "johnnybrushstrokes"
}
</script>
