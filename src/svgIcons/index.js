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


const Icons = props => ({
   // commonly used darksky icon names
   "clear-day": <ClearDayIcon {...props} />,
   "clear-night": <ClearNightIcon {...props} />,
   "rain": <RainMediumIcon {...props} />,
   "snow": <SnowIcon {...props} />,
   "sleet": <RainHeavyIcon {...props} />,
   "wind": <WindyDayIcon{...props} />,
   "fog": <FogIcon {...props} />,
   "cloudy": <CloudyIcon {...props} />,
   "partly-cloudy-day": <PartlyCloudyDayIcon {...props} />,
   "partly-cloudy-night": <PartlyCloudyNightIcon {...props} />,
   // potential future icon names
   "hail": <HailIcon {...props} />,
   "thunderstorm": <LightningIcon {...props} />,
   "tornado": <TornadoIcon {...props} />
   // other good icons
})

const WeatherIcon = props => Icons(props)[ props.icon ]


export default WeatherIcon