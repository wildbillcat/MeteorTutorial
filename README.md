#Meteor Tutorial

##Set Up Your Environment:

###Install Git
http://git-scm.com/downloads

###Install Node.js (Think Ruby)
http://nodejs.org/

###Install Meteor.js (Think Rails)
####*NIX
https://www.meteor.com/
####Windows
http://win.meteor.com/

###Install Meteorite (Think RubyGems)
Run in the Console(Git Bash on Windows)  
npm intall -g meteorite  
  
**Additional Windows ProTips: https://www.discovermeteor.com/blog/using-meteor-and-atmopshere-on-windows/
  
  
##Create an app:
mrt create Example1  
cd Example1  
Meteor  
  
##Check out the Example Apps
meteor create --example parties 
meteor create --example leaderboard 
meteor create --example todos 
meteor create --example wordplay 
cd leaderboard  
Meteor  
  
##Add Features
mrt create Example3  
cd Example3  

####*Nix
mrt add collection2  
mrt add accounts-ui  
mrt add d3  
####*Windows
cd packages  
git clone https://github.com/aldeed/meteor-collection2.git collection2  
cd collection2  
git submodule update --init  
cd ..  
git clone https://github.com/aldeed/meteor-simple-schema.git simple-schema  
git submodule update --init  
meteor add simple-schema  
meteor add collection2  
meteor add accounts-ui    
meteor add d3  

####Both  
meteor remove autopublish  

  
