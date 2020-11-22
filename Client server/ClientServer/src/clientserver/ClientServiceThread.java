package clientserver;

import java.io.*;
import java.net.*;
import java.nio.*;
import java.util.*;

public class ClientServiceThread extends Thread{
    private Socket connection;
    private InputStream input;
    private OutputStream output;
    
    public ClientServiceThread (Socket connection) throws IOException{
        this.connection=connection;
        input=this.connection.getInputStream();
        output=this.connection.getOutputStream();
    }
    
    public void run(){
        int n;
        byte [] buffer = new byte[1024];
        
        try{
            while((n=input.read(buffer))!=-1){
                if(n>0){
                    output.write(buffer,0,n);
                    output.flush();
                }
            }
        }
        catch(IOException exception){
            
        }
        try{
            System.out.println("Connessione chiusa");
            input.close();
            output.close();
            connection.shutdownInput();
            connection.shutdownOutput();
            connection.close();
        }
        catch(IOException exception){
       
        }
    }
}