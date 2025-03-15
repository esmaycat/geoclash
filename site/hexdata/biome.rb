require 'json'

oldbiomes = JSON.load_file('biomes.old.json')

mapping = {
  '#b9a087' => 'desert',
  '#72b38e' => 'taiga',
  '#33a02c' => 'forest',
  '#d9b400' => 'grassland'
}
biomes = {}

oldbiomes['groups'].each do |colour, data|
  biome = mapping[colour]
  data['paths'].each { |hex_id| biomes[hex_id] = biome }
end

File.open('biomes.json', 'w') { |file| JSON.dump(biomes, file) }
