import React from 'react';
import Routers from './routers';

import { AuthProvider } from './hooks/Auth';
import { MenuProvider } from './hooks/Menu';
import { ProdutoProvider } from './hooks/Produtos';
import { CategoriaProvider } from './hooks/Categories'

function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <ProdutoProvider>
          <CategoriaProvider>
            <Routers />
          </CategoriaProvider>
        </ProdutoProvider>

      </MenuProvider>
    </AuthProvider>
  );
}

export default App;
