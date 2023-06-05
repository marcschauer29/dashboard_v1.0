'use client'
import React, {ReactNode} from "react";
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/Plugins.css';
import 'styles/MiniCalendar.css';
import {ChakraProvider} from "@chakra-ui/react";
import theme from '../theme/theme';

import dynamic from 'next/dynamic';

const _NoSSR = ({ children }) => <React.Fragment>{children}</React.Fragment>;

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
    ssr: false,
});

export default function AppWrappers({ children }: { children: ReactNode }) {
    return (
        <NoSSR>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>;
        </NoSSR>
    );
}
