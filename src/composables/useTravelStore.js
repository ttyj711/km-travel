import { ref, computed } from 'vue'
import { travelData as defaultData } from '../data/travelData'

const stops = ref(JSON.parse(JSON.stringify(defaultData)))
let nextId = stops.value.length + 1

export function useTravelStore() {
  const stopList = computed(() => stops.value)

  const addStop = (stop) => {
    stops.value.push({
      id: nextId++,
      day: stop.day || `第${stops.value.length + 1}天`,
      name: stop.name,
      location: stop.location,
      altitude: stop.altitude || '未知',
      desc: stop.desc || '',
      tips: stop.tips || '',
      image: stop.image || 'https://images.unsplash.com/photo-1501785888041-1323e2e7b294?w=800&h=400&fit=crop',
      tags: stop.tags || []
    })
  }

  const removeStop = (index) => {
    if (index >= 0 && index < stops.value.length) {
      stops.value.splice(index, 1)
    }
  }

  const reorderStops = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return
    if (fromIndex < 0 || fromIndex >= stops.value.length) return
    if (toIndex < 0 || toIndex >= stops.value.length) return
    const [item] = stops.value.splice(fromIndex, 1)
    stops.value.splice(toIndex, 0, item)
  }

  const moveUp = (index) => {
    if (index <= 0) return
    reorderStops(index, index - 1)
  }

  const moveDown = (index) => {
    if (index >= stops.value.length - 1) return
    reorderStops(index, index + 1)
  }

  const resetStops = () => {
    stops.value = JSON.parse(JSON.stringify(defaultData))
    nextId = defaultData.length + 1
  }

  return {
    stops: stopList,
    addStop,
    removeStop,
    reorderStops,
    moveUp,
    moveDown,
    resetStops
  }
}
