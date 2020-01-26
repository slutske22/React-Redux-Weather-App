import React from 'react'

import { ClearDayIcon } from './ClearDayIcon'
import { ClearNightIcon } from './ClearNightIcon'
import { CloudyIcon } from './CloudyIcon'
import { RainMediumIcon } from './RainMediumIcon'
import { RainHeavyIcon } from './RainHeavyIcon'
import { SnowIcon } from './SnowIcon'
import { WindyDayIcon } from './WindyDayIcon'
import { FogIcon } from './FogIcon'
import { PartlyCloudyDayIcon } from './PartlyCloudyDayIcon'
import { PartlyCloudyNightIcon } from './PartlyCloudyNightIcon'
import { HailIcon } from './HailIcon'
import { LightningIcon } from './LightningIcon'
import { TornadoIcon } from './TornadoIcon'


const Icons = {
   // commonly used darksky icon names
   "clear-day": <ClearDayIcon />,
   "clear-night": <ClearNightIcon />,
   "rain": <RainMediumIcon />,
   "snow": <SnowIcon />,
   "sleet": <RainHeavyIcon />,
   "wind": <WindyDayIcon />,
   "fog": <FogIcon />,
   "cloudy": <CloudyIcon />,
   "partly-cloudy-day": <PartlyCloudyDayIcon />,
   "partly-cloudy-night": <PartlyCloudyNightIcon />,
   // potential future icon names
   "hail": <HailIcon />,
   "thunderstorm": <LightningIcon />,
   "tornado": <TornadoIcon />
   // other good icons
}

const WeatherIcon = props => Icons[ props.icon ]


export default WeatherIcon