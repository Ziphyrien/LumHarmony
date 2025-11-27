import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import type { ColorData, SceneType, HarmonyAnalysis } from '../lib/types';
import { createColorData, adjustColorsToScene, analyzeHarmony } from '../lib/color-utils';

interface State {
    scene: SceneType;
    primaryColors: ColorData[];
    adjustedColors: ColorData[];
    referenceId: string | null;
    backgroundColor: ColorData | null;
    textColor: ColorData | null;
    analysis: HarmonyAnalysis | null;
}

type Action =
    | { type: 'SET_SCENE'; payload: SceneType }
    | { type: 'ADD_COLOR'; payload: string } // hex
    | { type: 'ADD_COLORS'; payload: string[] } // hex array
    | { type: 'REMOVE_COLOR'; payload: string } // id
    | { type: 'SET_REFERENCE'; payload: string } // id
    | { type: 'SET_BG_COLOR'; payload: string | null } // hex or null
    | { type: 'SET_TEXT_COLOR'; payload: string | null } // hex or null
    | { type: 'RESET' };

const initialState: State = {
    scene: 'normal',
    primaryColors: [],
    adjustedColors: [],
    referenceId: null,
    backgroundColor: null,
    textColor: null,
    analysis: null
};

// Helper to calculate derived state (adjustedColors & Analysis)
function withDerivedUpdates(state: State): State {
    const adjustedColors = adjustColorsToScene(
        state.primaryColors,
        state.scene,
        state.referenceId
    );

    const analysis = state.primaryColors.length > 0 ? analyzeHarmony(
        state.primaryColors,
        state.scene,
        state.backgroundColor || undefined,
        state.textColor || undefined
    ) : null;

    return { ...state, adjustedColors, analysis };
}

function colorReducer(state: State, action: Action): State {
    let newState = state;

    switch (action.type) {
        case 'SET_SCENE':
            newState = { ...state, scene: action.payload, analysis: null };
            break;
            
        case 'ADD_COLOR': {
            if (state.primaryColors.length >= 10) return state;
            if (state.primaryColors.some(c => c.hex === action.payload)) return state; // Prevent duplicates
            
            const newId = crypto.randomUUID();
            const newColor = createColorData(action.payload, newId);
            const newColors = [...state.primaryColors, newColor];
            
            newState = {
                ...state,
                primaryColors: newColors,
                referenceId: state.referenceId || newId, // Auto-set reference if first color
                analysis: null
            };
            break;
        }

        case 'ADD_COLORS': {
            const newColors = [...state.primaryColors];
            let added = false;
            
            for (const hex of action.payload) {
                if (newColors.length >= 10) break;
                if (newColors.some(c => c.hex === hex)) continue;
                
                const newId = crypto.randomUUID();
                newColors.push(createColorData(hex, newId));
                added = true;
            }
            
            if (!added) return state;

            newState = {
                ...state,
                primaryColors: newColors,
                referenceId: state.referenceId || (newColors.length > 0 ? newColors[0].id : null),
                analysis: null
            };
            break;
        }
        
        case 'REMOVE_COLOR': {
            const newColors = state.primaryColors.filter(c => c.id !== action.payload);
            let newRefId = state.referenceId;
            
            if (state.referenceId === action.payload) {
                newRefId = newColors.length > 0 ? newColors[0].id : null;
            }
            
            newState = {
                ...state,
                primaryColors: newColors,
                referenceId: newRefId,
                analysis: null
            };
            break;
        }

        case 'SET_REFERENCE':
            newState = { ...state, referenceId: action.payload, analysis: null };
            break;

        case 'SET_BG_COLOR':
            newState = {
                ...state,
                backgroundColor: action.payload ? createColorData(action.payload, 'bg') : null,
                analysis: null
            };
            break;

        case 'SET_TEXT_COLOR':
            newState = {
                ...state,
                textColor: action.payload ? createColorData(action.payload, 'text') : null,
                analysis: null
            };
            break;

        case 'RESET':
            return initialState;
            
        default:
            return state;
    }

    return withDerivedUpdates(newState);
}

const ColorContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
} | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(colorReducer, initialState);


    return (
        <ColorContext.Provider value={{ state, dispatch }}>
            {children}
        </ColorContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColor() {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error('useColor must be used within a ColorProvider');
    }
    return context;
}