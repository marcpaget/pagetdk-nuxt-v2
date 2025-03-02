<template>

        <!-- <div class="mx-4">
          
          <progress
            class="place-content-center progress progress-info"
            :value="totalQuestions"
            :max="10"
          />
        </div> -->
        <div flex flex-col></div>
        <div col-span-2>
       
        </div>
        <!-- <div class="flex flex-col">
          <div class="basis-1/2 justify-center self-center text-center">
            <span class="text-4xl text-sky-600 justify-center self-center text-center mb-4">Score</span>
          </div>
        </div> -->
        <div class="flex flex-row justify-center">
          <div class="basis-1/3">
          <span class="text-xl text-sky-600 text-center mb-2">Progress</span>
          <p class="text-2xl text-green-600 text-center mb-2">{{ totalQuestions }}/10</p>
        </div>
          <div class="basis-1/3">
            <p class="text-xl text-sky-600 text-center mb-2">Correct</p>
            <p class="text-2xl text-green-600 text-center mb-2">{{ score }}</p>
         
          </div>
          <div class="basis-1/3">
            <p class="text-xl text-sky-600 text-center mb-2">Wrong</p>
            <p class="text-2xl text-red-600 text-center mb-2">{{ wrong }}</p>
        
          </div>
        </div>
        <div class="card-body items-center text-center px-4">
          <figure class="w-64 mx-auto">
            <template v-if="isMounted">
              <img
                v-if="currentFlag"
                :src="currentFlag"
                :alt="'Flag of ' + correctAnswer"
                class="rounded-xl w-full h-40 object-cover"
                @error="handleImageError"
              >
              <div v-else class="animate-pulse bg-gray-200 h-40 w-full rounded-xl"></div>
            </template>
          </figure>

          <div class="card-actions w-64 mt-4">
            <div class="flex flex-col w-full gap-2">
              <button
                v-for="(option, index) in options"
                :key="index"
                class="btn btn-primary w-full"
                :disabled="isLoading"
                @click="checkAnswer(option)"
              >
                {{ option }}
              </button>
            </div>
          </div>
        </div>
  
</template>


<script>
export default {
  data() {
    return {
      countries: [],
      options: [],
      currentFlag: '',
      correctAnswer: '',
      score: 0,
      wrong: 0,
      totalQuestions: 0,
      isLoading: true,
      isMounted: false
    }
  },
  mounted() {
    this.isMounted = true
    this.fetchCountries()
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all', {
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        this.countries = data.filter(country => country.flags?.png || country.flags?.svg)
        this.getRandomFlag()
      } catch (error) {
        console.error('Error fetching countries:', error)
        this.isLoading = false
      }
    },
    getRandomFlag() {
      if (!this.countries || this.countries.length === 0) {
        console.error('Countries array is empty or not defined')
        return
      }
      const randomIndex = Math.floor(Math.random() * this.countries.length)
      this.currentFlag = this.countries[randomIndex].flags?.png || this.countries[randomIndex].flags?.svg
      this.correctAnswer = this.countries[randomIndex].name.common
      this.options = this.getRandomOptions(this.correctAnswer)
      this.isLoading = false
    },
    getRandomOptions(correctAnswer) {
      const options = [correctAnswer]
      while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * this.countries.length)
        const option = this.countries[randomIndex].name.common
        if (!options.includes(option)) {
          options.push(option)
        }
      }
      return options.sort(() => Math.random() - 0.5)
    },
    checkAnswer(option) {
      if (this.isLoading) return
      
      this.totalQuestions++
      if (option === this.correctAnswer) {
        this.score++
      } else {
        this.wrong++
      }

      this.getRandomFlag()
    }
  }
}
</script>

<!-- 
<script>
// Script section remains unchanged
export default {
  data() {
    return {
      countries: [],
      options: [],
      currentFlag: '',
      correctAnswer: '',
      score: 0,
      wrong: 0,
      number: 10,
      remaining: 10,
      totalQuestions: 0,
      selected: '',
      isLoading: true,
      retryCount: 0,
      maxRetries: 3,
      isMounted: false
    }
  },
  mounted() {
    this.isMounted = true
    this.fetchCountries()
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all', {
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        this.countries = data.filter(country => country.flags?.png || country.flags?.svg)
        this.getRandomFlag()
      }
      catch (error) {
        console.error('Error fetching countries:', error)
        this.isLoading = false
      }
    },
    async sendScore(score) {
      try {
        const response = await fetch('https://pagetv2.netlify.app/api/send', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ score })
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        return await response.json()
      } catch (error) {
        console.error('Error sending score:', error)
      }
    },
    async getRandomFlag() {
      this.isLoading = true
      this.retryCount = 0
      
      const randomIndex = Math.floor(Math.random() * this.countries.length)
      const country = this.countries[randomIndex]
      
      this.currentFlag = country.flags?.png || country.flags?.svg
      this.correctAnswer = country.name.common
      this.options = this.getRandomOptions(this.correctAnswer)
      
      if (this.currentFlag) {
        const img = new Image()
        img.onload = () => {
          this.isLoading = false
        }
        img.onerror = () => {
          this.handleImageError()
        }
        img.src = this.currentFlag
      } else {
        this.isLoading = false
      }
    },
    handleImageError() {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++
        console.log(`Retrying flag load (attempt ${this.retryCount})...`)
        this.getRandomFlag()
      } else {
        console.error('Failed to load flag after maximum retries')
        this.isLoading = false
      }
    },
    getRandomOptions(correctAnswer) {
      const options = [correctAnswer]
      while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * this.countries.length)
        const option = this.countries[randomIndex].name.common
        if (!options.includes(option)) {
          options.push(option)
        }
      }
      return options.sort(() => Math.random() - 0.5)
    },
    async checkAnswer(option) {
      if (this.isLoading) return
      
      this.totalQuestions++
      if (option === this.correctAnswer) {
        this.score++
        try {
          await this.sendScore(this.score)
        } catch (error) {
          console.error('Failed to send score:', error)
        }
      } else {
        this.wrong++
      }

      await this.getRandomFlag()
    }
  }
}
</script> -->