export const bloquesCodigo = [
  {
    id: 1,
    nombre_plugin: "Bubble Sort",
    descripcion_plugin: "Implementación de burbuja",
    posicion: 0,
    contenido_codigo:
      "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr",
    lenguaje_programacion: "python",
    concepto: 1,
  },
  {
    id: 2,
    nombre_plugin: "Quick Sort",
    descripcion_plugin: "Implementación rápida",
    posicion: 1,
    contenido_codigo:
      "function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n  for (let i = 1; i < arr.length; i++) {\n    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);\n  }\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}",
    lenguaje_programacion: "javascript",
    concepto: 1,
  },
];