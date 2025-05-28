import 'dart:async';
import 'dart:convert';
import 'dart:developer' as developer;
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hôpital Sycamore',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;
  bool _isLoading = false;
  String? _error;
  List<dynamic> _medecins = [];
  List<dynamic> _infirmieres = [];
  List<dynamic> _chambres = [];
  List<dynamic> _patients = [];

  @override
  void initState() {
    super.initState();
    developer.log('Initialisation de la page d\'accueil');
    _loadData();
  }

  Future<void> _loadData() async {
    developer.log('Début du chargement des données');
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      developer.log('Chargement des médecins...');
      final medecins = await _fetchData('doctors');
      developer.log('Chargement des infirmières...');
      final infirmieres = await _fetchData('nurses');
      developer.log('Chargement des chambres...');
      final chambres = await _fetchData('rooms');
      developer.log('Chargement des patients...');
      final patients = await _fetchData('patients');

      setState(() {
        _medecins = medecins;
        _infirmieres = infirmieres;
        _chambres = chambres;
        _patients = patients;
        _isLoading = false;
      });
      developer.log('Chargement des données terminé avec succès');
    } catch (e) {
      developer.log('Erreur lors du chargement des données: $e');
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<List<dynamic>> _fetchData(String endpoint) async {
    developer.log('Tentative de chargement des données depuis $endpoint');
    try {
      final baseUrl =
          Platform.isAndroid ? 'http://10.0.2.2:3333' : 'http://localhost:3333';
      final uri = Uri.parse('$baseUrl/$endpoint');
      developer.log('URL de la requête: $uri');

      final response = await http.get(
        uri,
        headers: {'Accept': 'application/json'},
      ).timeout(
        const Duration(seconds: 10),
        onTimeout: () {
          developer.log('Timeout lors de la requête vers $endpoint');
          throw TimeoutException('La requête a expiré');
        },
      );

      developer.log('Statut de la réponse: ${response.statusCode}');
      developer.log('Corps de la réponse: ${response.body}');

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        developer.log('Données décodées: $data');
        return data;
      } else {
        developer.log('Erreur HTTP: ${response.statusCode}');
        throw Exception('Erreur HTTP: ${response.statusCode}');
      }
    } catch (e) {
      developer.log('Erreur lors du chargement des données: $e');
      if (e is TimeoutException) {
        throw Exception(
            'Le serveur met trop de temps à répondre. Veuillez réessayer.');
      } else if (e is http.ClientException) {
        throw Exception(
            'Impossible de se connecter au serveur. Vérifiez que le serveur est en cours d\'exécution.');
      } else {
        throw Exception('Une erreur est survenue: $e');
      }
    }
  }

  Widget _buildCard(String title, String subtitle, IconData icon) {
    return Card(
      margin: const EdgeInsets.all(8),
      child: ListTile(
        leading:
            Icon(icon, size: 32, color: Theme.of(context).colorScheme.primary),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
      ),
    );
  }

  Widget _buildContent() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_error != null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, color: Colors.red, size: 48),
            const SizedBox(height: 16),
            Text(_error!, style: const TextStyle(color: Colors.red)),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _loadData,
              child: const Text('Réessayer'),
            ),
          ],
        ),
      );
    }

    Widget content;
    String emptyMessage;

    switch (_selectedIndex) {
      case 0:
        content = ListView.builder(
          itemCount: _medecins.length,
          itemBuilder: (context, index) {
            final medecin = _medecins[index];
            return _buildCard(
              '${medecin['firstName']} ${medecin['lastName']}',
              'Spécialité: ${medecin['specialty']}\nTéléphone: ${medecin['phone']}',
              Icons.medical_services,
            );
          },
        );
        emptyMessage = 'Aucun médecin trouvé';
        break;
      case 1:
        content = ListView.builder(
          itemCount: _infirmieres.length,
          itemBuilder: (context, index) {
            final infirmiere = _infirmieres[index];
            return _buildCard(
              '${infirmiere['firstName']} ${infirmiere['lastName']}',
              'Service: ${infirmiere['service']}\nTéléphone: ${infirmiere['phone']}',
              Icons.health_and_safety,
            );
          },
        );
        emptyMessage = 'Aucune infirmière trouvée';
        break;
      case 2:
        content = ListView.builder(
          itemCount: _chambres.length,
          itemBuilder: (context, index) {
            final chambre = _chambres[index];
            return _buildCard(
              'Chambre ${chambre['number']}',
              'Étage: ${chambre['floor']}\nCapacité: ${chambre['capacity']}\nStatut: ${chambre['status']}',
              Icons.bed,
            );
          },
        );
        emptyMessage = 'Aucune chambre trouvée';
        break;
      case 3:
        content = ListView.builder(
          itemCount: _patients.length,
          itemBuilder: (context, index) {
            final patient = _patients[index];
            return _buildCard(
              '${patient['firstName']} ${patient['lastName']}',
              'Âge: ${patient['age']}\nÉtat de santé: ${patient['healthStatus']}',
              Icons.person,
            );
          },
        );
        emptyMessage = 'Aucun patient trouvé';
        break;
      default:
        return const Center(child: Text('Page non trouvée'));
    }

    return _getCurrentList().isEmpty
        ? Center(child: Text(emptyMessage))
        : content;
  }

  List<dynamic> _getCurrentList() {
    switch (_selectedIndex) {
      case 0:
        return _medecins;
      case 1:
        return _infirmieres;
      case 2:
        return _chambres;
      case 3:
        return _patients;
      default:
        return [];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hôpital Sycamore'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadData,
            tooltip: 'Rafraîchir les données',
          ),
        ],
      ),
      body: _buildContent(),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.medical_services),
            label: 'Médecins',
          ),
          NavigationDestination(
            icon: Icon(Icons.health_and_safety),
            label: 'Infirmières',
          ),
          NavigationDestination(
            icon: Icon(Icons.bed),
            label: 'Chambres',
          ),
          NavigationDestination(
            icon: Icon(Icons.person),
            label: 'Patients',
          ),
        ],
      ),
    );
  }
}
