# @olibm/bindqs

Compsitable `useQsPropString` and more

```sh
pnpm add @olibm/bindqs
```

```sh
pnpm add https://github.com/olibm/bindqs
```

## useQsPropString
```vue
<template>
    <q-input v-model="myModel" label="Try me" />
</template>

<script setup>
import { useQsPropString } from '@olibm/bindqs'

const myModel = useQsPropString('qs_name')
</script>
```


# Development
```sh
pnpm i
tsc
pnpm publish
```
