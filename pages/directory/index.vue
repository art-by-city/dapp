<template>
  <v-container id="discover-page">
    <v-row>
      <v-col>
        <span class="text-h4">Directory</span>
      </v-col>
    </v-row>
    <v-row
      justify="center"
    >
      <v-col>
        <v-list lines="one">
          <v-list-item
            v-for="user in users"
            :key="user"
          >
            <Avatar :address="user" small class="mr-2" />
            <ResolveUsername :address="user" />
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const users = [
  "0EeHrLUiUepAW3IZ8ZrNRu8bxEOlumouTdMYKBPPPTM",
  "1KZdIq1mkiTjb1gf6f5c__MUkheFyU6UK8-MMciSKnE",
  "1cX5WcLKn2kPWmiXPKbRIPpAWm5YP9H1172HpkYN1QI",
  "1qXUQWHAqdk7JWk8PWcXlkhUdBuSH8hOZ010gVNexbc",
  "2aLkIcBH52s2LtZoyRQC_YaFGGSB2r2yGUtgYM5MjZc",
  "3VOaO9LbI-zbta_u5Lw_KOTb-MAcRWikcV4X9fVvqBA",
  "3iqkDExLuyVn_Q3ojigg0pWmS_MgQjU_R5LCyo82CkE",
  "3tt4qUpZSL5iFk5kMtu1Q_hgdsxd6FgyuRN37OICJes",
  "4T0gyN4fDHrKSitSl-sw5_FuxGLg8sysBRsP4OF0I2o",
  "5V9nhSOQ5NeCRw9hAPoTMk8z1WimZfEeOqrbsvX_7-U",
  "6uzZ2xVslWpFib3BR-J731uogU-FRuKDUifFVRZq8xE",
  "8Ki2ZXNe373ku9thijG_0tN8XR9B3mRoseGZqF1OpLM",
  "9XaFpHnpswVxZ7juWnG5iK9tYocYG_EYRf9WRmzbfCQ",
  "36Ar8VmyC7YS7JGaep9ca2ANjLABETTpxSeA7WOV45Y",
  "83cE_sKfvJ2XugWumQZPY8KU9PpWqC8P_CnItpJWXn4",
  "276ituk07Igo0QzT5sa_ISRXwp04T5RfzBwZHS808h4",
  "A2JEmT4LTk5WeBUFRGESX07OR-FUbtqfdBlBl8ooB64",
  "AVLvtbpOYQUM6_AAO2H0yG44Wl7A3O_F81YlIGrIaOA",
  "AuIwEAQiHQHRDEMgXBHtYoJnQUlka2fqZsSvcxnLdE4",
  "CxuvfybNxiEPpXGqIbM7tzzdSYOlOW9VOUWkf0FWH4c",
  "FB38OEe2LaObB4wpCu84NeQ1v7WsM9qltzRJfCZT3tg",
  "FffUfjSCpv2PJhw1P0qzfM1P7xejXPdAQ-2qNWclFTg",
  "IEQHFG7nty3NvgTJB-22TX9iLv_wRBvzawg6dUQ6dM8",
  "IP6zGbkq6jM_3VkzOiXrErbGisgIQCkkn6TlyFptPPY",
  "IyWaTU4CUbaamvkK6oDNGCuB2pKMe7s3N4015qgY4iM",
  "LtILfPM8agd7RU6AaQmwh0SFEvxPu-tb06E_iHksvUM",
  "Q-47UUx60RSHNKS8jWkJA0DHX--PhGDC_0njFIplraQ",
  "Qk6U75ZH_Wtwq5BsNSZK35eYq2lUZbVtP_qfif2JeZk",
  "RJM8gDmbjPQw71EuN5rDgNQOLqE_WVvTDyqn4dNxZUg",
  "TJm7pAxZyJNE8IhYgC1ZEF3RiRI3B5u38REQJU0uy8I",
  "TpdM8DXFdrcFwlJPv4v-jG1QAMWQi735FktvP74n6D4",
  "UZcMu3sc90iBbmOU-LUS7mFsziPGIBLgcHKpB013pnk",
  "Uy2XZ7P7F4zBllF5uPdd1ih9jiQrIGvD3X8L13cc5_s",
  "V1Vw3pLLoo67TNBMxP5SNh0iyoYAqoFLmCTUl2TBR-4",
  "X3JpXG7ih3fyOaAqo3JXFBa2PLxKz7Va4v2xKWI23xA",
  "XMRo2-N6pZZi7vo3A9gg1_ncK3fRuGYheuz7Lo7PH1Y",
  "YftBIDY3rUeITuEhhXBHCGY77K6VkBj70STjRyGFE4k",
  "YiQwzqUom7VYHCQ8WfTiXkHPGsVY7_zVk8fF9SuGYwI",
  "aJIPwBoPqt1FGaa4pRoMotuDZr68PHRAoXe3lUerFTs",
  "aYDOU6kEcE3lK7aA-gTmUKHTbLlQnZZXWpv1_i_Uq1U",
  "bVa4IblSUZ0_VsqXPcr0e3oF6Q87yJ6EUVsxbwqwWmY",
  "cbXs6b-7NtpGtI2ed_A8p6sZRa2Ofy9L-hdxFK4EOL0",
  "dYRuag6nzcdFXJ02_Ljf8ks-WDUrpAMeSI0agFd_ZBQ",
  "fnJn1Kk2OTJeAK0cdfi4HLruw-9eaxImxVbnX226uJk",
  "fsoSa_ZaN32EVo3nmmInaPq-7aZ4TTlWVaaYeNjpZ7A",
  "fzZvnOKhZoEC7txjXj-pYx-sSV3NLDLJi9u4BhvzXxU",
  "gU0ESu0Vm7SVjpjFf4yTSQUxPdC9Y84dOAxGNEVB0ac",
  "hyL5aEp4K7fd7hYEjKxi6caxjyL2UANONOnnnFe7jwc",
  "i_0lXhTIsKKABEKYNlNTiKtY3QTbo9Dm56uzEvvi85g",
  "k4fkc6NDiMmfVR06qX5P5XvAOlLi9J9fgBaa8pLvIBc",
  "kxOp1vsQZz-09PI5JGQ4ZQFUS1cFef6RiMRIEtgMtvQ",
  "mKRPxOSIe08BddCnrL9en8C3hUGqwA5l1sUZilGsjDg",
  "mg2tlAm4WgE7EgjavH09iOU67NwJIAyAFCDXg7RIdfc",
  "nN5tmr6oBh5LBpFyVeq9iTn8NsxNZN9ziWC05PRyXE0",
  "oDu0duoGgGJrKDaRU7AXnxVCYq-3LIi-jIX26pWThaw",
  "od35xAb8aQJjCHeLqg2n85dzSO5qEQSibYWrRgLJ7ko",
  "pZL40EWklkb9fO-9blbwvymjLUt5T5U31wldAnk-QAM",
  "qoFt_qa74r8rPAIeZVd7wJUdQwLi8_7NvDOxs1dWf3c",
  "rxcJhMO1f1PUGUbM3gkBpNVK60iV-qhkqVK7jk2qGGo",
  "x3GW6wfBZ3wHTflETInuzJ5rOv_6JvlFi-dl6yYAr8Y",
  "xzCrjqG0qjX66T8mGNFyQEKd4qK6clSlp8XVvw2glwE",
  "ykP865v2o25da4fOR4Nex102tvTd7PXDsbCHPNLZV0o",
  "zIe2L7WAptLeDdDUcGPOFtBkItZuRE2wE2GQh2LfFqc"
]
</script>
