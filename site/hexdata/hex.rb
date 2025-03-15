require 'nokogiri'
require 'json'

map = Nokogiri::XML(File.read('map.svg'))
biome_data = JSON.load_file('biomes.json')

paths = map.xpath('/svg:svg/svg:path', { 'svg' => 'http://www.w3.org/2000/svg' })

hexdata = []

paths.each do |path|
  next if path['id'] == 'state_borders' # Not a hexagon

  x, y = path['d'][1..].split(' ')[0, 2]
  biome = biome_data[path['id']]
  hexdata << { id: path['id'], biome: biome, x: x.to_f, y: y.to_f }
end

File.open('hexdata.json', 'w') { |file| JSON.dump(hexdata, file) }
