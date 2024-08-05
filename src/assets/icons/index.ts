import bug from './bug.svg'
import dark from './dark.svg'
import dragon from './dragon.svg'
import electric from './electric.svg'
import fairy from './fairy.svg'
import fighting from './fighting.svg'
import fire from './fire.svg'
import flying from './flying.svg'
import ghost from './ghost.svg'
import grass from './grass.svg'
import ground from './ground.svg'
import ice from './ice.svg'
import normal from './normal.svg'
import poison from './poison.svg'
import psychic from './psychic.svg'
import rock from './rock.svg'
import steel from './steel.svg'
import water from './water.svg'

const getTypeIcon = (name: string) => {
    switch(name) {
        case 'bug': return bug
        case 'dark': return dark
        case 'dragon': return dragon
        case 'electric': return electric
        case 'fairy': return fairy
        case 'fighting': return fighting
        case 'fire': return fire
        case 'flying': return flying
        case 'ghost': return ghost
        case 'grass': return grass
        case 'ground': return ground
        case 'ice': return ice
        case 'normal': return normal
        case 'poison': return poison
        case 'psychic': return psychic
        case 'rock': return rock
        case 'steel': return steel
        case 'water': return water
        default: return bug
    }
}

export { getTypeIcon, bug, dark, dragon, electric, 
    fairy, fighting, fire, flying, ghost, 
    grass, ground, ice, normal, poison, 
    psychic, rock, steel, water
}
