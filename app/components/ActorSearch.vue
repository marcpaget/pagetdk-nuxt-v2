<script setup lang="ts">
type Person = {
  id: number
  name: string
  profile_path: string | null
  known_for_department: string
}

const emit = defineEmits<{
  select: [person: Person]
}>()

const query = ref('')
const results = ref<Person[]>([])

function selectPerson(person: Person) {
  emit('select', person)

  query.value = ''
  results.value = []
}
</script>