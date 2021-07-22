import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            background: string,
            backgroundField: string,
            borderColor: string,
            textColor: string,
            closeRoom: string,
            header: string
        }
    }
}