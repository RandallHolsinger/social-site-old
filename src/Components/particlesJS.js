import React from 'react';
import Particles from 'react-particles-js';

export default function ParticlesJS() {
    
    return (
        <div>
                  <Particles 
              params={{
            		particles: {
                        number: {
                            value: 150,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        
            			
            		}
                }}
                style ={{
                    width: '100%',
                    background: '#000000'
                }}
            />
        </div>
    )
}