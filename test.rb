require 'pandoc-ruby'
puts PandocRuby.convert('# Markdown Title', :from => :markdown, :to => :html)