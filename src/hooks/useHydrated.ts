'use client';
import {useSyncExternalStore} from 'react';
const subscribe=()=>()=>{};
const client=()=>true;
const server=()=>false;
/** Keep client-only controls disabled until their event handlers are attached. */
export function useHydrated(){return useSyncExternalStore(subscribe,client,server)}
