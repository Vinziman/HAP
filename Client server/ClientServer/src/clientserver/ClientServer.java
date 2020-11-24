package clientserver;

import java.net.*;
import java.io.*;

public class ClientServer extends Thread {
    
    public final static int SERVER_PORT = 12345;
    private ServerSocket server;
    
    public ClientServer(int port) throws IOException{
        server = new ServerSocket(port);
        server.setSoTimeout(1000);
    }
    
    public void run(){
        Socket connection = null;
        while(!Thread.interrupted()){
            try{
                connection = server.accept();
                System.out.println("Connessione richiesta dal "+
                        connection.getInetAddress()+toString()+
                        ";"+connection.getPort());
            Thread ClientService = new ClientServiceThread(connection);
            ClientService.start();
            }
            catch(SocketTimeoutException exception){
                System.err.println("Errore! Time-out..");
            }
            catch(IOException exception){
                System.err.println("Errore di comunicazione!");
            }
        }
        
        try{
            server.close();
        }
        catch(IOException exception){
                System.err.println("Errore di comunicazione!");
            }
    }
    
    public static void main(String[] args) {
        int c;
        try{
            ClientServer server = new ClientServer(SERVER_PORT);
            server.start();
            System.out.println("PREMERE INVIO PER CHIUDERE IL SERVER");
            c=System.in.read();
            server.interrupt();
            server.join();
        }
        catch(IOException exception){
                System.err.println("Errore di connessione!");
            }
        catch(InterruptedException exception){
                System.err.println("Errore di interruzione!");
            }
    }
    
}