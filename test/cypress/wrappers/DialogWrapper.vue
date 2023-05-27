<script setup lang="ts">
import { useQuasar } from 'quasar'

const { dialog } = useQuasar()

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
  componentProps: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits<{
  (e: 'ok', value: unknown): void
  (e: 'cancel'): void
  (e: 'dismiss'): void
}>()

dialog({
  component: props.component,

  // props forwarded to your custom component
  componentProps: props.componentProps,
})
  .onOk((value?: unknown) => {
    emit('ok', value)
  })
  .onCancel(() => {
    emit('cancel')
  })
  .onDismiss(() => {
    emit('dismiss')
  })
</script>
