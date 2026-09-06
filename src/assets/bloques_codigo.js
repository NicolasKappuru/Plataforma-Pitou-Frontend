export const bloquesCodigo = [
  {
    id: 1,
    nombre_plugin: "Bubble Sort",
    descripcion_plugin:
      "Implementación del ordenamiento de burbuja en Python. Recorre la lista de forma repetida, compara elementos adyacentes y los intercambia si están en el orden incorrecto.",
    posicion: 2,
    contenido_codigo:
      "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n\nnumeros = [64, 34, 25, 12, 22, 11, 90]\nprint(bubble_sort(numeros))",
    lenguaje_programacion: "python",
    concepto: 1,
  },
  {
    id: 2,
    nombre_plugin: "Quick Sort",
    descripcion_plugin:
      "Implementación del ordenamiento rápido en JavaScript aplicando la técnica de divide y vencerás, utilizando un pivote para particionar el arreglo.",
    posicion: 3,
    contenido_codigo:
      "function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n\n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n\n  for (let i = 1; i < arr.length; i++) {\n    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);\n  }\n\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}\n\nconst numeros = [10, 7, 8, 9, 1, 5];\nconsole.log(quickSort(numeros));",
    lenguaje_programacion: "javascript",
    concepto: 1,
  },
];