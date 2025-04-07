import { Request, Response } from 'express';
import User from '..models/userModel';

// Crea un nuovo utente
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // Verifica se l'email è già presente nel database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Se l'email esiste già, solleva un errore
      throw new Error('Email già esistente');
    }

    // Se non esiste, crea il nuovo utente
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error: unknown) {
    // TypeScript richiede un cast esplicito per gestire errori tipizzati come 'unknown'
    if (error instanceof Error) {
      // Ora TypeScript sa che 'error' è un'istanza di 'Error'
      res.status(400).json({ error: error.message });
    } else {
      // Se l'errore non è un'istanza di 'Error', invia un errore generico
      res.status(400).json({ error: 'Errore sconosciuto' });
    }
  }
};

// Ottieni tutti gli utenti
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error: unknown) {
    // Gestione dell'errore
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Errore sconosciuto' });
      }
    }
};

// Ottieni un utente per ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw new Error('Utente non trovato');
    }
    res.status(200).json(user);
  } catch (error: unknown) {
    // Gestione dell'errore
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Errore sconosciuto' });
    }
  }
};

// Aggiorna un utente
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw new Error('Utente non trovato');
    }

    // Aggiorna l'utente con i nuovi valori
    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();
    
    res.status(200).json(user);
  } catch (error: unknown) {
    // Gestione dell'errore
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Errore sconosciuto' });
    }
  }
};

// Elimina un utente
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
          throw new Error('Utente non trovato');
        }
    
        await user.destroy();
        res.status(200).json({ message: 'Utente eliminato con successo' });
      } catch (error: unknown) {
        // Gestione dell'errore
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error: 'Errore sconosciuto' });
        }
      }
};
