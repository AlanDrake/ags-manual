-- invoke as Pandoc writer
-- test for required features

package.path = package.path .. ';' ..
  string.gsub(PANDOC_SCRIPT_FILE, '/[^/]+$', '') .. '/agsman.lua'
local agsman = require('agsman')
local serialize = agsman.serialize

PANDOC_VERSION:must_be_at_least(
  '2.9.2',
  'Pandoc 2.9.2 is required for use of list:insert')

PANDOC_VERSION:must_be_at_least(
  '2.11',
  'Pandoc 2.11 is required for correct application of syntax highlighting')

PANDOC_VERSION:must_be_at_least(
  '2.11.1.1',
  'Pandoc 2.11.1.1 is required for correct link parsing')

-- Test Doc return of a word-split on a non-breaking space
-- This seems to be broken for some platforms prior to Pandoc 2.10
local nbsp_words = {}
for w in ("\u{160}"):gmatch('%w+') do
  nbsp_words[w] = 1
end

function Doc(body, metadata, variables)
  return serialize(nbsp_words)
end

local meta = {}
meta.__index =
  function(_, key)
    return function() return '' end
  end
setmetatable(_G, meta)
