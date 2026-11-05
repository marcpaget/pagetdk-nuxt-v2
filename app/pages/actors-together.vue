<script setup lang="ts">
type Person = {
  id: number
  name: string
  profile_path: string | null
  known_for_department: string
}

const selectedPeople = ref<Person[]>([])

function addPerson(person: Person) {
  if (!selectedPeople.value.some((p) => p.id === person.id)) {
    selectedPeople.value.push(person)
  }
}

function removePerson(id: number) {
  selectedPeople.value = selectedPeople.value.filter(
    (person) => person.id !== id,
  )
}
</script>

<template>
  <div>
    <ActorSearch @select="addPerson" />

    <div class="selected-people">
      <button
        v-for="person in selectedPeople"
        :key="person.id"
        type="button"
        @click="removePerson(person.id)"
      >
        {{ person.name }} ×
      </button>
    </div>
  </div>
</template>